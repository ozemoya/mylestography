import DesktopChrome from "../components/DesktopChrome";
import MixedMedia from "../components/MixedMedia";
import Navbar from "../components/Navbar";

export default function MediaPage() {
  return <DesktopChrome><div className="retro-site">
    <Navbar />
    <main><MixedMedia /></main>
  </div></DesktopChrome>;
}
