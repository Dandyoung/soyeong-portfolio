"use client";

export default function MenuTrigger() {
  const toggle = () => {
    document.body.classList.toggle("show-menu");
    document.body.classList.toggle("noscroll");
  };
  return (
    <div id="menu-trigger" className="fixed-trigger menu-tohide uppercase" onClick={toggle} role="button" tabIndex={0}>
      [ <span className="menu-label">Menu</span><span className="close-label">Close</span> ]
    </div>
  );
}
