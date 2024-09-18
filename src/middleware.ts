import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {currentUser} from '@/services/'

export async function middleware(request: NextRequest) {
    const token:any = request.cookies.get('auth')?.value ;
    const { pathname } = request.nextUrl;


    // Skip middleware for static files like .js, .css, and images
    if (
        pathname.startsWith('/_next/') 
        || pathname.startsWith('/static/') 
        || pathname.match(/\.(js|css|png|jpg|svg|ico)$/)
    ) {
        return NextResponse.next();
    }
    
    // If the user is not logged in and tries to access any page other than /signin, redirect to /signin
    if (!token && pathname !== '/signin') {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    //if the token is in cookies
    if(token){
        try {
            const user = await  currentUser(token);
            if (user.statusCode !== 200) {
                const response = NextResponse.redirect(new URL('/signin', request.url));
                response.cookies.delete('auth'); 
                return response;
            }
    
        } catch (error) {
            console.log(error)
            const response = NextResponse.redirect(new URL('/signin', request.url));
            response.cookies.getAll().map((i,index)=> response.cookies.delete(`${i.name}`)); 
            return response;
        }
    }
    
}

// Matching all paths
export const config = {
    matcher: [
        '/:path*',
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
