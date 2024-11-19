import NotifiList from './_components/NotifiList';

export default async function notification() {
  return (
    <div className="bg-white flex  flex-col text-black p-2 transition-all rounded-md dark:bg-darkBlue dark:text-white">
      <NotifiList />
    </div>
  );
}
