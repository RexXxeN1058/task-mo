import { AuditLog } from "@prisma/client";
import { generateLogMessage } from "@/lib/generate-log-message";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface ActivityItemProps {
  data: AuditLog;
}

export const ActivityItem = ({ data }: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700">
            {data.userName}
          </span>{" "}
          {generateLogMessage(data)}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatTime(new Date(data.createdAt))} 
        </p>
      </div>
    </li>
  );
};

export default function formatTime(dateInput: Date) {
  const date = new Date(dateInput);
  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  const dayOfMonth = localDate.getDate();
  const month = localDate.toLocaleString("en", { month: "short" });
  const year = localDate.getFullYear();
  let hours = localDate.getHours();
  const minutes = localDate.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; 
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;

  return `${month} ${dayOfMonth}, ${year} at ${hours}:${minutesStr} ${ampm}`;
}
