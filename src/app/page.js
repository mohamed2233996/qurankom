import Intro from "@/components/Intro";
import Live from "@/components/live";
import Navbar from "@/components/navbar";
import Quranplayer from "@/components/quranplayer";

export default async function Home() {
  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
});
  return (
    <>
      <Navbar />
      <Intro />
      <Quranplayer />
      <Live />
    </>
  );
}
