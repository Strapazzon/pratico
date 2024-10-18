import { Link } from "@i18n/routing";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import "./page.scss";
import { TextureBackground } from "@components/UI/TextureBackground";

type HomePageProps = {
  params: {
    lang: string;
  };
};

export const revalidate = 604800;

export async function generateMetadata(props: HomePageProps) {
  const t = await getTranslations("seo");
  const { params } = props;
  const { lang } = params;
  return {
    title: t("title"),
    description: t("description"),
    locale: lang,
  };
}

export default function Home() {
  const t = useTranslations("home");
  return (
    <Flex direction="column" gap="1" height="100%">
      <TextureBackground />
      <div className="header">
        <Heading mb="2" size="6">
          {t("appName")}
        </Heading>
        <Flex gap="3">
          <Link href="/auth/register">
            <Button variant="outline">{t("register")}</Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="solid">{t("login")}</Button>
          </Link>
        </Flex>
      </div>
      <Flex
        direction="column"
        gap="1"
        justify="center"
        align="center"
        height="100%"
        p={{ initial: "2", md: "4" }}
      >
        <Heading mb="2" size="6" color="gray">
          {t("title")}
        </Heading>
        <Text>{t("subtitle")}</Text>
      </Flex>
    </Flex>
  );
}
