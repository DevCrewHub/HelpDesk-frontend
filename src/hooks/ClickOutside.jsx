import { useEffect } from "react";

export function useClickOutside(ref, onClose, triggerRef, isOpen) {
  useEffect(() => {
    if(isOpen) return;

    function handleClickOutside(event) {
      const clickedInsideFlyout = ref.current && ref.current.contains(event.target);
      const clickedTrigger = triggerRef.current && triggerRef.current.contains(event.target);
      if (!clickedInsideFlyout && !clickedTrigger) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose, triggerRef]);
}
