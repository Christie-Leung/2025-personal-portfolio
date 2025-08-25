import React from "react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import ReactSkinview3d from "react-skinview3d"
import { WavePointAnimation } from "~/utils/WavePointAnimation";
import { TextShimmer } from "./ui/text-shimmer";
import { MailIcon } from "lucide-react";
import { LuInstagram, LuLinkedin } from "react-icons/lu";

type ContactModalProps = {
  children?: React.ReactNode;
};  

const ContactModal = ({
  children
}: ContactModalProps) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent
        banner={
          <div className="relative ml-6">
            <ReactSkinview3d
              skinUrl="/assets/textures/skin.png"
              height="250"
              width="150"
              onReady={({ viewer }) => {
                viewer.animation = new WavePointAnimation();
              }}
            />
            <span className="w-full absolute bottom-8 justify-center flex">
              <TextShimmer>Rotate me</TextShimmer>
            </span>
          </div>
        }
        bannerPos="left"
      >
        <DialogHeader>
          <DialogTitle>Interested?</DialogTitle>
          <DialogDescription>
            Feel free to reach out.
          </DialogDescription>
        </DialogHeader>
        <DialogDescription>
          <div className="w-full h-full flex flex-row space-x-2">
            <Button variant="outline" size="icon" onClick={() => window.open("mailto:christie@murphyshome.net")}>
              <MailIcon />
            </Button>
            <Button variant="outline" size="icon" onClick={() => window.open("https://www.instagram.com/christiee.leungg")}>
              <LuInstagram />
            </Button>
            <Button variant="outline" size="icon" onClick={() => window.open("https://www.linkedin.com/in/christie-leung-dev")}>
              <LuLinkedin />
            </Button>
          </div>
        </DialogDescription>
        <DialogFooter className="mt-auto">
          <DialogClose asChild className="relative">
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
