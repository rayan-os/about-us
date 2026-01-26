import { CopyRight } from "@/components/common/footer/components";
import { LegalLinkName } from "@/components/common/footer/constants";
import { HomeLayout } from "@/layouts/home-layout";
import { Sections } from "./components/sections";

export const HomePage = () => {
  return (
    <HomeLayout>
      <div>
        <Sections />
        <div className="flex text-sm justify-center md:justify-start mx-auto w-full px-3 md:px-4 py-4 col-span-full text-gray-400">
          <CopyRight droppedLinks={[LegalLinkName.WITHDRAWAL_POLICY]} />
        </div>
      </div>
    </HomeLayout>
  );
};
