import Image from "next/image";
import poloroid from "../../public/poloroid.png";
import Navbar from "../components/Navbar";

/**
 * The homepage of the site, containing the main heading and a call to action to book a session.
 * The images inside of the poloroid photos should 'rotate' to new images periodically maybe about a 1 minute or so.
 */
export default function menu() {
  return (
    <div className="bg-[#EFD5AD] grid grid-rows-[20px_1fr_20px]  items-center justify-items-center min-h-screen p-8 pb-20 gap-16">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div id="title" className="w-[635px] text-center justify-start">
          <div id="menu options" className="flex flex-col gap-10 items-center p-10 translate-x-[-80%]">
            <a 
              href="https://ozemoya.github.io/"
              className="text-white text-4xl font-normal font-['Iowan_Old_Style']">
                personal website
            </a>
            <a 
              href="https://www.instagram.com/kadsphere/?next=%2F"
              className="text-white text-4xl font-normal font-['Iowan_Old_Style']">
                instagram
            </a>
            <a 
              href="/about"
              className="flex flex-row text-white text-4xl font-normal font-['Iowan_Old_Style']">
                about
            </a>
            <a 
            href= "/"
            className="text-white text-4xl font-normal font-['Iowan_Old_Style']">
                back
            </a>
          </div>

          <Image
            id="poloroid1"
            src={poloroid}
            alt="Poloroid"
            className="absolute z-0 translate-y-[-70%] translate-x-[50%] rotate-2"
          />
          <Image
            id="poloroid2"
            src={poloroid}
            alt="Poloroid"
            className="absolute z-0 translate-y-[-70%] translate-x-[80%] rotate-12 " 
          />
          <Image
            id="poloroid3"
            src={poloroid}
            alt="Poloroid"
            className="absolute z-0 translate-y-[-70%] translate-x-[10%] rotate-350 "
          />
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Navbar />
        </div>
      </main>
    </div>
  );
}