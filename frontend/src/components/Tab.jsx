import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

export function TabsWithIcon() {
  return (
    <Tabs value="public" defaultActive="public" >
      <TabsHeader className="flex items-center justify-center py-[10px] px-[10px] bg-[#1d1d1d4d] rounded-[10px] transition duration-100 w-[50%]">
        <Tab
          value="public"
          activeClassName="bg-[#1d1d1d] text-gray-900 rounded-[5px] w-full transition duration-500 ease-in-out"
        >
          <div className="flex items-center gap-2 px-4 py-2 text-white border-b-2 border-transparent transition-all">
            <h1>Public</h1>
          </div>
        </Tab>
        <Tab
          value="social"
          activeClassName="bg-[#1d1d1d] text-gray-900 rounded-[5px] w-full transition duration-500 ease-in-out"
        >
          <div className="flex items-center gap-2 px-4 py-2 text-white border-b-2 border-transparent transition-all">
            <h1>Social</h1>
          </div>
        </Tab>
        <Tab
          value="private"
          activeClassName="bg-[#1d1d1d] text-gray-900 rounded-[5px] w-full transition duration-500 ease-in-out"
        >
          <div className="flex items-center gap-2 px-4 py-2 text-white border-b-2 border-transparent transition-all">
            <h1>Private</h1>
          </div>
        </Tab>
      </TabsHeader>
      <TabsBody>
        <TabPanel value="public">
          <h1>Public Container</h1>
        </TabPanel>
        <TabPanel value="social">
          <h1>Social Container</h1>
        </TabPanel>
        <TabPanel value="private">
          <h1>Private Container</h1>
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
}
