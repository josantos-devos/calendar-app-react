import { addHours } from "date-fns";
import { useUiStore, useCalendarStore } from "../../hooks";

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const onClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "Jonathan",
      },
    })

    openDateModal();
  };

  return (
    <button className="btn btn-primary fab" onClick={onClickNew}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
