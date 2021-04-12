import {
  Button,
  Card,
  Switch,
  CardActions,
  CardContent,
} from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import React, {
  forwardRef,
  PropsWithoutRef,
  PropsWithRef,
  useRef,
  useState,
} from "react";

export interface ModuleProps {
  title: string;
  description: string;
  onSwitchChange?: (forModule: string) => void;
  onConfigure?: () => void;
  enabled?: boolean;
  ref?: any;
}

export const Module: React.ForwardRefExoticComponent<
  PropsWithRef<ModuleProps>
> = forwardRef<HTMLDivElement, ModuleProps>(
  (
    { description, title, enabled, onSwitchChange: onChange, onConfigure },
    ref
  ) => {
    const [isSwitchOn, setIsSwitchOn] = useState(enabled);

    const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsSwitchOn(!isSwitchOn);
      if (onChange) onChange(title);
    };

    const bgClass = isSwitchOn ? "bg-f-semidark" : "bg-f-offdark";
    const fgClass = isSwitchOn ? "text-f-light" : "text-gray-400";

    return (
      <div
        ref={ref}
        className={`w-full max-w-md flex flex-col justify-between ${bgClass}`}
        style={{ backgroundColor: `${bgClass} !important` }}
      >
        <CardContent className={bgClass}>
          <div className="flex justify-between">
            <div className={`text-xl font-bold pb-2 ${fgClass}`}>{title}</div>
            <div>
              <Switch
                checked={isSwitchOn}
                onChange={handleSwitch}
                color="secondary"
              />
            </div>
          </div>
          <div className={`w-64 text-sm font-medium ${fgClass}`}>
            {description}
          </div>
        </CardContent>
        <CardActions className={bgClass}>
          <Button
            startIcon={<Settings />}
            size="small"
            color="primary"
            onClick={onConfigure}
            disabled={!isSwitchOn}
          >
            Configure
          </Button>
        </CardActions>
      </div>
    );
  }
);

export default Module;
