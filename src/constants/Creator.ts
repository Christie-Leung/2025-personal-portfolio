type LinkProps = {
  icon: string;
  label: string;
  onClick: () => void;
}

export const creatorLinks: LinkProps[] = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
    label: "💌 ugc + collabs",
    onClick: () => window.location.href = ""
  },
]

export const travels: LinkProps[] = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
    label: "✈️ travel essentials",
    onClick: () => window.location.href = ""
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
    label: "🗺️ travel blog",
    onClick: () => window.location.href = ""
  }
]