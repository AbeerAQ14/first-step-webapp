const LoadingOverlay = ({ content }: { content: string }) => {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white mx-4 p-6 sm:min-w-96 rounded-lg shadow-md flex flex-col items-center">
        <span dir="ltr" className="text-lg font-medium">
          {content}
        </span>
        <div className="mt-4 mx-auto w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
};

export default LoadingOverlay;
