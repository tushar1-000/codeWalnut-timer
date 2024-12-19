import React, { useEffect, useRef, useState } from "react";
import { Trash2, RotateCcw, Pencil } from "lucide-react";
import { Timer } from "../types/timer";
import { formatTime } from "../utils/time";
import { useTimerStore } from "../store/useTimerStore";
import { toast } from "sonner";
import AddEditModal from "./AddEditModal";
import { TimerAudio } from "../utils/audio";
import { TimerControls } from "./TimerControls";
import { TimerProgress } from "./TimerProgress";
import ReusableButton from "./ReusableButton";
import { useToast } from "../custom hooks/useToast";

interface TimerItemProps {
  timer: Timer;
}

export const TimerItem: React.FC<TimerItemProps> = ({ timer }) => {
  const {showSuccessToast} =  useToast()
  const { toggleTimer, deleteTimer, updateTimer, restartTimer } =
    useTimerStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const timerAudio = TimerAudio.getInstance();
  const hasEndedRef = useRef(false);

  useEffect(() => {
    if (timer.isRunning) {
      intervalRef.current = setInterval(() => {
        updateTimer(timer.id);
        if (timer.remainingTime <= 1 && !hasEndedRef.current) {
          hasEndedRef.current = true;
          timerAudio.play().catch(console.error);
          //Custom hook for toast
          showSuccessToast(`Timer "${timer.title}" has ended! hooray` , {
            label: "Dismiss",
            onClick: () => timerAudio.stop(),
          }) 
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current!);
  }, [timer.isRunning, timer.id, timer.remainingTime]);

  const handleRestart = () => {
    hasEndedRef.current = false;
    restartTimer(timer.id);
  };

  const handleDelete = () => {
    timerAudio.stop();
    deleteTimer(timer.id);
  };

  const handleToggle = () => {
    if (timer.remainingTime <= 0) {
      hasEndedRef.current = false;
    }
    toggleTimer(timer.id);
  };

  return (
    <>
      <div className="relative bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-102 overflow-hidden">
        <div className="absolute inset-0 w-full h-full -z-10 opacity-5">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M50 20V50L70 70"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="relative">
          <div className="flex justify-between items-start mb-8 mt-8  h-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {timer.title}
              </h3>
              <p className="text-gray-600 mt-1">{timer.description}</p>
            </div>
            <div className="flex gap-2">
              <ReusableButton
                title="Edit Timer"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Pencil className="w-5 h-5" />
              </ReusableButton>

              <ReusableButton title="Restart Timer" onClick={handleRestart}>
                <RotateCcw className="w-5 h-5" />
              </ReusableButton>

              <ReusableButton
                title="Delete Timer"
                onClick={handleDelete}
                variant="danger"
              >
                <Trash2 className="w-5 h-5" />
              </ReusableButton>
            </div>
          </div>
          <div className="flex flex-col items-center mt-6">
            <div className="text-4xl font-mono font-bold text-gray-800 mb-4">
              {formatTime(timer.remainingTime)}
            </div>

            <TimerProgress
              progress={(timer.remainingTime / timer.duration) * 100}
            />

            <TimerControls
              isRunning={timer.isRunning}
              remainingTime={timer.remainingTime}
              duration={timer.duration}
              onToggle={handleToggle}
              onRestart={handleRestart}
            />
          </div>
        </div>
      </div>

      <AddEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        timer={timer}
        titleHead="Edit"
      ></AddEditModal>
    </>
  );
};
