import { Game } from "./game";
import Data from "@/data/data.json";

function getOptions() {
  return Data.institutos.map(inst => inst.name);
}

export default function Home() {

  const options = getOptions();

  return (
    <main className="bg-usp min-h-screen w-full bg-center flex items-center justify-center">
      <Game institutos={Data.institutos} options={options} />
    </main>
  );
}
