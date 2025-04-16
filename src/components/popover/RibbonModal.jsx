import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeRibbon } from "../../store/popupSlice";
import Title from "../../ui/Title";

function RibbonModal() {
  const isOpen = useSelector((state) => state.popup.isRibbonOpen);
  const item = useSelector((state) => state.popup.addItem);
  const dispatch = useDispatch();

  function onClose() {
    dispatch(closeRibbon());
  }

  return (
    <Transition show={isOpen} as={Fragment} onClick={onClose}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div
          className="fixed inset-0 bg-black/30"
          aria-hidden="true"
          onClick={onClose}
        />

        <div className="fixed inset-0 flex items-end justify-center px-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <div className="bg-grey-secondary w-full max-w-md rounded-t-2xl p-4 shadow-xl">
              <Title level={4}>Add to Watchlist</Title>

              <div className="max-h-60 space-y-2 overflow-y-auto">
                {/* {lists.map((list) => (
                  <label key={list.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedLists.includes(list.id)}
                      onChange={() => toggleList(list.id)}
                    />
                    <span>{list.name}</span>
                  </label>
                ))} */}
              </div>

              <div className="mt-4">
                <input
                  type="text"
                  placeholder="New list name"
                  className="border-grey-primary/50 w-full rounded border px-2 py-1"
                />
              </div>

              <div className="mt-4 flex justify-end">
                <button className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800">
                  Add
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}

export default memo(RibbonModal);
