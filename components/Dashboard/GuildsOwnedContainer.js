import "twin.macro";

export default function GuildsOwnedContainer(props) {
  return (
    <div tw="flex flex-col items-center p-12 justify-between bg-Light h-64 w-80 m-4 rounded shadow-xl text-center ease-in-out transform hover:scale-110 transition duration-300">
      <h1 tw="text-2xl font-bold m-2">Guilds owned</h1>
      <h1 tw="text-2xl font-bold m-2">{props.matches.length}</h1>
    </div>
  );
}
