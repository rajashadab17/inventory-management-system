import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export function NavActions() {
  return (
    <>
      <div className="flex items-center gap-3 text-sm">
        <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
          <div className="flex items-center justify-center">
            <ModeToggle />
          </div>
        </Button>
      </div>
    </>
  );
}
