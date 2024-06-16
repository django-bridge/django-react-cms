import React, { useRef, ReactElement } from "react";
import styled, { keyframes } from "styled-components";
import { OverlayContext } from "@django-render/core";
import WarningRounded from "@mui/icons-material/WarningRounded";
import Drawer from '@mui/joy/Drawer';
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";

const ModalWrapper = styled.div`
  min-height: 100%;
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 40px;
`;

const ModalBody = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const slideInUnsavedChangesWarning = keyframes`
    from {
        margin-top: -50px;
    }

    to {
        margin-top: 0
    }
`;

const UnsavedChangesWarningWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 20px;
  padding: 15px 20px;
  color: #2e1f5e;
  font-size: 15px;
  font-weight: 400;
  margin-top: 0;
  background-color: #ffdadd;
  animation: ${slideInUnsavedChangesWarning} 0.5s ease;

  svg {
    height: 18px;
    flex-shrink: 0;
    color: #d9303e;
  }

  p {
    line-height: 19.5px;
  }

  strong {
    font-weight: 700;
  }
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
  React.useEffect(() => {setTimeout(() => setOpen(true), 50)}, []);

  const { requestClose, closeRequested, closeBlocked, onCloseCompleted } = React.useContext(OverlayContext);

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

  // Close modal on click outside
  const bodyRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const clickEventListener = (e: MouseEvent) => {
      // Close modal on click outside
      if (
        bodyRef.current &&
        e.target instanceof HTMLElement &&
        !bodyRef.current.contains(e.target)
      ) {
        e.preventDefault();
        requestClose();
      }
    };

    document.body.addEventListener("mouseup", clickEventListener);

    return () => {
      document.body.removeEventListener("mouseup", clickEventListener);
    };
  }, [requestClose]);

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
    <ModalBody ref={bodyRef}>
      {closeBlocked && (
        <UnsavedChangesWarningWrapper
          role="alert"
          aria-live="assertive"
        >
          <WarningRounded />
          <p>
            <strong>You have unsaved changes.</strong> Please save or
            cancel before closing
          </p>
        </UnsavedChangesWarningWrapper>
      )}
      <ModalContent>
        <ModalWrapper>{children}</ModalWrapper>
      </ModalContent>
    </ModalBody>
  );

  if (slideout) {
    return (
      <Drawer anchor={slideout} open={open && !closing} size="md" sx={{
        '--Drawer-transitionDuration': (open && !closing) ? '0.4s' : '0.2s',
        '--Drawer-transitionFunction': (open && !closing)
          ? 'cubic-bezier(0.79,0.14,0.15,0.86)'
          : 'cubic-bezier(0.77,0,0.18,1)',
        '--Drawer-horizontalSize': 'clamp(300px, 100%, 650px)',
      }}>
        {body}
      </Drawer>
    );
  } else {
    return (
      <Modal open={open && !closing}>
        <ModalDialog size="lg" sx={{
          '--ModalDialog-minWidth': '500px',
          '--ModalDialog-maxWidth': '1000px',
          'width': '100%',
        }}>
          {body}
        </ModalDialog>
      </Modal>
    );
  }
}

export default ModalWindow;
