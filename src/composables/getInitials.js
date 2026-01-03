const getInitials = (name) => {
  const initials = name
    .split(" ")
    .filter((word) => word !== "Dr." && word !== "Dr")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return initials;
};

export default getInitials;
