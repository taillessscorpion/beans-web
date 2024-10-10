import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { footer } from "@/app/fixed-data";
import LinkList from "./FooterLinkList";

const logos = footer.logos;
const Footer = () => {
  return (
    <footer>
      <div className="Main Container">
        {/* ///// Logo */}
        <div>
          <img
            decoding="async"
            data-nimg="1"
            src={logos[0].url}
            alt={logos[0].alt}
            width={400}
            height={90}
          />
          <ul>
            <li>
              <Link href={"/thousand-stores/lab-coffee"}>
                <div>
                  <FontAwesomeIcon icon={faStore} />
                </div>
                <h3>Lab Coffee:</h3>
              </Link>
              <Link
                href={
                  "https://www.google.com/maps/place/The+Thousand+Beans+-+Lab+Coffee/@10.7669439,106.6615233,17z/data=!3m1!4b1!4m6!3m5!1s0x31752f764abdd601:0x246c57f3dd6c8f09!8m2!3d10.7669386!4d106.6640982!16s%2Fg%2F11tm_771m0?entry=ttu"
                }
                target="_blank"
              >
                <div>
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <span>
                  506/15/27 đường 3 tháng 2, phường 14, quận 10, Thành phố Hồ
                  Chí Minh
                </span>
              </Link>
              <Link href={"tel:+84836034566"}>
                <div>
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <span>+84 836 034 566</span>
              </Link>
              <Link href={"mailto: thousandbeans@thethousandgroup.com.vn"}>
                <div>
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <span>thousandbeans</span>
                  <span>@thethousandgroup</span>
                  <span>.com.vn</span>
                </div>
              </Link>
            </li>
          </ul>
          <Link
            href={
              "https://thuvienphapluat.vn/ma-so-thue/cong-ty-tnhh-the-thousand-group-mst-0316123417.html"
            }
            target="_blank"
          >
            <img

              decoding="async"
              data-nimg="1"
              src={logos[3].url}
              alt={logos[3].alt}
              width={250}
              height={70}
            />
          </Link>
        </div>
        {/* //// The thousand beans */}
        <div>
          <h2>TỔ CHỨC</h2>
          <img

            decoding="async"
            data-nimg="1"
            src={logos[2].url}
            alt={logos[2].alt}
            width={250}
            height={70}
          />
          <img
            decoding="async"
            data-nimg="1"
            src={logos[1].url}
            alt={logos[1].alt}
            width={250}
            height={70}
          />
        </div>
        {/* //// Link */}
        <div>
          <LinkList links={footer.links[0]} />
          <LinkList links={footer.links[2]} />
          <LinkList links={footer.links[3]} />
          <LinkList links={footer.links[1]} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
