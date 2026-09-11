export const MODEL_VIEWER_MESSAGE_SOURCE = "ai-labz-model-viewer";

export function isViewerReadyMessage(event, frameWindow, source) {
  return (
    event?.source === frameWindow &&
    event?.data?.source === source &&
    event?.data?.type === "ready"
  );
}
