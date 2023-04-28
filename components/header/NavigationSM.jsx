import { Nav } from "react-bootstrap";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { links } from "@/data/data";

const NavigationSM = ({ setExpanded }) => {
  const { t } = useTranslation();
  const { push } = useRouter();

  return (
    <div className="d-block d-lg-none">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Nav.Item
            key={link.name}
            role="button"
            className="py-2 d-flex w-100"
            onClick={() => {
              setExpanded(false);
              push(`${link.link}`);
            }}
          >
            <Icon />
            <h2 className="mx-3 mb-0">{t(`${link.name}`)}</h2>
          </Nav.Item>
        );
      })}
    </div>
  );
};

export default NavigationSM;
