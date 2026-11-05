import DesktopChrome from "../components/DesktopChrome";
import MixedMedia from "../components/MixedMedia";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";

export default function MediaPage() {
  return <DesktopChrome><div className="retro-site">
    <Navbar />
    <main><MixedMedia /></main>
    <SiteFooter />
  </div></DesktopChrome>;
}
