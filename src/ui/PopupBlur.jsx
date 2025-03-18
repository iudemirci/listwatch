function PopupBlur({ children }) {
  return (
    <div className="fixed inset-0 z-10000 flex items-center justify-center p-2 backdrop-blur-xs">
      {children}
    </div>
  );
}

export default PopupBlur;
