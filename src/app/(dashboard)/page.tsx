import Image from "next/image";
import Card from "./_components/kpi/Card";
import { FaUsers } from "react-icons/fa";

const cardData = {
  title: "Total users",
  value: 2000,
};

export default async function Home() {
  return (
    <main className="flex flex-col gap-4">
      <div className="w-full grid grid-cols-1 gap-6  sm:grid-cols-2 md:grid-cols-4">
        <Card style="indigoGr" icon={FaUsers} data={cardData} />
        <Card style="indigoGr" icon={FaUsers} data={cardData} />
        <Card style="indigoGr" icon={FaUsers} data={cardData} />
        <Card style="indigoGr" icon={FaUsers} data={cardData} />
      </div>
      {/* <Image
        src="http://62.169.17.152:6540/uploads/image-1741180818148-49253460.jpg"
        width={100}
        height={100}
        alt="123"
      /> */}
    </main>
  );
}
