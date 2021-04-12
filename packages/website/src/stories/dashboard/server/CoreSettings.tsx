import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";

export interface CoreSettingsProps {
  updateNickname?: (newName: string) => void;
  currentNickname?: string;
  updatePrefix?: (newPrefix: string) => void;
  currentPrefix?: string;
}

const CoreSettings: React.FC<CoreSettingsProps> = ({
  currentNickname,
  currentPrefix,
  updateNickname,
  updatePrefix,
}) => {
  const [prefix, setPrefix] = useState(currentPrefix);
  const [nick, setNick] = useState(currentNickname);

  const handleNickname = () => {
    if (updateNickname && nick) return updateNickname(nick);
  };

  const handlePrefix = () => {
    if (updatePrefix && prefix) updatePrefix(prefix);
  };

  return (
    <div className="text-f-light shadow rounded bg-f-semidark p-4 w-full">
      <div className="uppercase font-bold text-xl pb-6">Bot Settings</div>
      <div className="flex flex-col gap-y-10">
        <div className="flex flex-row gap-x-6 items-end">
          <TextField
            label={`Nickname`}
            variant="standard"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            fullWidth
          />
          <Button
            className="h-1/3"
            disabled={nick === currentNickname}
            onClick={() => setNick(currentNickname)}
          >
            Reset
          </Button>
          <Button
            color="primary"
            className="h-1/3"
            disabled={nick === currentNickname}
            onClick={handleNickname}
          >
            Update
          </Button>
        </div>
        <div className="flex flex-row gap-x-6 items-end">
          <TextField
            label={`Prefix`}
            variant="standard"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            fullWidth
          />
          <Button
            className="h-1/3"
            disabled={prefix === currentPrefix}
            onClick={() => setPrefix(currentPrefix)}
          >
            Reset
          </Button>
          <Button
            color="primary"
            className="h-1/3"
            disabled={prefix === currentPrefix}
            onClick={handlePrefix}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoreSettings;
