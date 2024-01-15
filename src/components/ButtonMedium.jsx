import {Button} from "@nextui-org/react";

// eslint-disable-next-line react/prop-types
export default function ButtonMedium({children}) {
  return (
    <div className="flex gap-4 items-center">
      
      <Button size="md" color="secondary" radius="full" className="m-auto">
        {children}
      </Button>  
      
    </div>
  );
}


