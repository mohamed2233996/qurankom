import Intro from "@/components/Intro";
import All from "@/components/all";
import Live from "@/components/live";
import Quranplayer from "@/components/quranplayer";

export default async function Home() {
  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
});
  return (
    <>
      <Intro />
      <Quranplayer />
      <Live />
      <All />
    </>
  );
}
