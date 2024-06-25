import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Maps from '@/components/Maps.jsx';

const Layout = () => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        data sekolah
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <Maps />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Layout;
