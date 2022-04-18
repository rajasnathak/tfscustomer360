import React from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
//import Icon from "@material-ui/core/Icon";
// @material-ui/icons
//import Warning from "@material-ui/icons/Warning";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

//import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

// Import Graph
import { ForceGraph } from "../../components/Graph/Graph";

// Import data
import data from "../../data/data.json";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const nodeHoverTooltip = React.useCallback((node) => {
    return `<div>${node.name}</div>`;
  }, []);
  return (
    <div>
      <GridContainer>
        {/* <GridItem xs={8}>
          <CustomTabs
            title=""
            headerColor="primary"
            tabs={[
              {
                tabName: "Search",
                tabIcon: Search,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
            ]}
          />
        </GridItem> */}
        <GridItem xs={8}>
          <Card>
            <ForceGraph
              linksData={data.links}
              nodesData={data.nodes}
              nodeHoverTooltip={nodeHoverTooltip}
            />
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
