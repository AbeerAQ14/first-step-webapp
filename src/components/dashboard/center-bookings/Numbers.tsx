const Numbers = () => {
  const numbers = {
    rejected: { title: "مرفوض", value: 10, color: "#F6D6D5" },
    waitingForConfirmation: {
      title: "بانتظار التأكيد",
      value: 10,
      color: "#FFECC5",
    },
    waitingForPayment: { title: "بانتظار الدفع", value: 10, color: "#F87070" },
    confirmed: { title: "تم الدفع", value: 10, color: "#B1CDFB" },
  };

  return (
    <div className="grow">
      <div className="grid grid-cols-2 gap-4 ">
        {Object.values(numbers).map(
          (item: { title: string; value: number; color: string }) => (
            <Card key={item.title} {...item} />
          )
        )}
      </div>
    </div>
  );
};

export default Numbers;

const Card = (info: { title: string; value: number; color: string }) => {
  return (
    <div
      className="rounded-xl px-4 py-2 min-w-fit text-primary font-bold"
      style={{ background: info.color }}
    >
      <p className="whitespace-nowrap">{info.title}</p>
      <p className="text-4xl">{info.value}</p>
    </div>
  );
};
