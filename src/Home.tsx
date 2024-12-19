import { useState } from "react";
import { Plus, Clock } from "lucide-react";
import { TimerList } from "./components/TimerList";
// import { AddTimerModal } from "./components/AddTimerModal";
import AddEditModal from "./components/AddEditModal";
import { Toaster } from "sonner";
import ReusableButton from "./components/ReusableButton";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timer = {
    id: "",
    title: "",
    description: "",
    duration: 0, // in seconds
    remainingTime: 0,
    isRunning: false,
    createdAt: 0,
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between mb-8">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600 md:w-8 md:h-8" />
            <h1 className="text-md font-bold text-gray-900 md:text-3xl">Timer App</h1>
          </div>
          <ReusableButton
            title="Add Timer"
            variant="addBtn"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-5 h-5" />
            Add Timer
          </ReusableButton>
        </div>

        <TimerList />

        <AddEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          titleHead="Add"
          timer={timer}
        ></AddEditModal>

        {/* <AddTimerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        /> */}
      </div>
    </div>
  );
}

export default Home;
