export  const getButtonClass = (filter: string, buttonFilter: string) => {
    return filter === buttonFilter
      ? "bg-[#05AEEE] text-white border-opacity-15"
      : "bg-[#F7F7F7] bg-opacity-10 text-[#666666]";
  };