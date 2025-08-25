import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

type SearchModalProps = {
  children?: React.ReactNode;
}

const busyStatements = [
  "playing Minecraft",
  "building projects",
  "contemplating about life",
  "taking a break",
  "eating black sesame ice cream",
  "watching anime",
  "spending time with her family",
  "journaling new creative ideas",
  "getting lost in a daydream",
  "listening to lo-fi beats",
  "scrolling for recipe inspo",
  "studying deep learning",
  "reading about quantum computing",
  "catching up on Japanese vocabulary",
  "trying a new high-protein recipe",
  "refactoring old code",
  "debugging code",
  "designing magical plugins for a Minecraft Server",
]

const SearchModal = ({
  children
}: SearchModalProps) => {
  const [statement, setStatement] = useState("");
  const rand = () => busyStatements[Math.floor(Math.random() * busyStatements.length)];

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          setStatement(rand());
        }
      }}
    >
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Oops! The search feature is not yet implemented 😬</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Christie is too busy {statement} to implement this feature right now. Please check back later!
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default SearchModal;