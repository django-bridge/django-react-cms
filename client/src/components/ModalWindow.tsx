import React, { useRef, ReactElement } from "react";
import styled from "styled-components";
import { OverlayContext } from "@django-bridge/react";
import Drawer from "@mui/joy/Drawer";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";

const ModalWrapper = styled.div`
  min-height: 100%;
`;

const ModalBody = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const ModalContent = styled.div`
  position: relative;
`;

let nextModalId = 1;

interface ModalWindowProps {
  slideout?: "left" | "right";
}

function ModalWindow({
  children,
  slideout,
}: React.PropsWithChildren<ModalWindowProps>): ReactElement {
  const id = useRef<string | null>(null);
  if (!id.current) {
    id.current = `overlay-${nextModalId}`;
    nextModalId += 1;
  }

  // Open state
  // On first render this is false, then it immediate turns to true
  // This triggers the opening animation
  // Note: add a 50ms delay as sometimes it loads too fast for React to notice
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => setOpen(true), 50);
  }, []);

  const { requestClose, closeRequested, onCloseCompleted } =
    React.useContext(OverlayContext);

  // Closing state
  const [closing, setClosing] = React.useState(false);
  React.useEffect(() => {
    if (closing) {
      const timeout = setTimeout(onCloseCompleted, 200);

      return () => {
        clearTimeout(timeout);
      };
    }

    return () => {};
  });

  // If parent component requests close, then close.
  React.useEffect(() => {
    if (closeRequested) {
      setClosing(true);
    }
  }, [closeRequested]);

  React.useEffect(() => {
    const keydownEventListener = (e: KeyboardEvent) => {
      // Close modal on click escape
      if (e.key === "Escape") {
        e.preventDefault();
        requestClose();
      }
    };

    document.addEventListener("keydown", keydownEventListener);

    return () => {
      document.removeEventListener("keydown", keydownEventListener);
    };
  });

  // Prevent scroll of body when modal is open
  React.useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const body = (
    <ModalBody>
      <ModalContent>
        <ModalWrapper>{children}</ModalWrapper>
      </ModalContent>
    </ModalBody>
  );

  if (slideout) {
    return (
      <Drawer
        anchor={slideout}
        open={open && !closing}
        size="md"
        sx={{
          "--Drawer-transitionDuration": open && !closing ? "0.4s" : "0.2s",
          "--Drawer-transitionFunction":
            open && !closing
              ? "cubic-bezier(0.79,0.14,0.15,0.86)"
              : "cubic-bezier(0.77,0,0.18,1)",
          "--Drawer-horizontalSize": "clamp(300px, 100%, 650px)",
        }}
      >
        {body}
      </Drawer>
    );
  } else {
    return (
      <Modal open={open && !closing}>
        <ModalDialog
          size="lg"
          sx={{
            "--ModalDialog-minWidth": "500px",
            "--ModalDialog-maxWidth": "1000px",
            width: "100%",
            p: 0,
          }}
        >
          {body}
        </ModalDialog>
      </Modal>
    );
  }
}

export default ModalWindow;
