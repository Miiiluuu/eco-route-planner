import Image from 'next/image';
import Styles from './BackgroundImage.module.css'

export default function BackgroundImage() {
  return (
    <div className={Styles.backgroundimage} id="map">
      <Image
        src="/Hintergrund.webp"
        alt="footprints of water in a forest"
        layout="fill"
      />
      <div className={Styles.backgroundtextleft}>Travel</div>
      <div className={Styles.backgroundtextright}>ecofriendly.</div>
    </div>
  );
}
