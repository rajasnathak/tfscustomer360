import React from "react";
import { useRef } from 'react';
import Header from "components/Headers/Header";
import { styled } from "@mui/system";
import { Accordion } from "@mui/material";
import MuiAccordion from '@mui/material/Accordion';
import { AccordionSummary } from "@mui/material";
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/system";
import Grid from '@mui/material/Grid';
import Flippy, { FrontSide, BackSide } from 'react-flippy';// Lazy load ReactHoverFlip as it is a pure react component 
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
  

export default function Index() {
  const ref = useRef();
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    
    <>
    
      <Header />
      {/* Page content */}
      <div>
      <Box
        display="flex" 
        width={'100%'} height={'100%'} 
        bgcolor="#32325d"
        color='white'
        padding={5}
      >
        <Box m="auto">
        Welcome Home! You can get a complete 360 view of customer(s) here. Let’s see how… <br/><br/>

The first dropdown for search gives you the option to select the type of data you want to look at. Each of these categories pertain to some information fields associated with the customer/s in question. <br/><br/>

Next, the search bar gives you the option to search by a few categories using the “Search by” drop-down: <br/><br/>

All Data: The search returns all the information across all categories discussed below for all the customers in our database.<br/><br/>

UPID: The search returns the unique customer to which this Unique Party Identifier belongs.<br/><br/>

Customer Name: The search returns all the customers with the name mentioned. The search keyword/s should correspond to the full customer’s name including the first, last, and middle names along with any prefixes/suffixes in the name.<br/><br/>

Account Number: The search returns all the customers associated with the given account number.<br/><br/>

VIN: The search returns all the customers associated with the given Vehicle Identification Number.<br/><br/><br/>

Finally, you enter the search keyword corresponding to one of the criteria above that you selected and click search – “Voila!” you get a graph showing you the 360o view of the profile of customer/s.<br/><br/>

Reading the Graph:<br/><br/>

So, once you have the graph with the information corresponding to the categories you want to see, now what? You obviously want to play with the graph dynamically searching through different categories, and that is where the Node Legend comes into play:<br/><br/>

Node Legend: You can dynamically select the categories you want to view in the graph by clicking the categories corresponding to the ones you want to see.<br/><br/>

Hover Over the graph to single out and highlight portions of the graph you want to view. Click on the Nodes to view the metadata regarding the node.<br/><br/>

In addition, you can also Drill Down on the nodes which have a dashed line highlighted around them. These nodes have the ability to open up into further categories of information. Click on these nodes and click on the drill down option that is prompted.<br/><br/>

Easy right? Get started! <br/>
        </Box>
        </Box>

    </div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Category Definitions</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Grid container spacing={2} padding={2} paddingLeft={9}>
  <Grid item xs={2.3} >
    <Flippy
      flipOnHover={true} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '190px', height: '190px' }} /// these are optional style, it is not necessary
  >
    <FrontSide style={{ fontSize: "30px",
        color:"black",
          position: "absolute",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: '#eb0a1e',}} >
    Party <br />
    </FrontSide>
    <BackSide style={{ 
          }}>
    Data pertaining to individuals or organizations directly involved or interested in TFS.
    </BackSide>
    
  </Flippy>
  </Grid>
  <Grid item xs={2.3}>
    <Flippy
      flipOnHover={true} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '190px', height: '190px' }} /// these are optional style, it is not necessary
  >
    <FrontSide style={{ fontSize: "30px",
        color:"black",
          position: "absolute",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: '#2ca58d'}} >
    Asset <br />
    </FrontSide>
    <BackSide style={{ backgroundColor: '#'}}>
    Data pertaining to the identification of assets owned by parties associated with TFS.

    </BackSide>
    
  </Flippy>
  </Grid>
  <Grid item xs={2.3}>
  <Flippy
      flipOnHover={true} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '190px', height: '190px' }} /// these are optional style, it is not necessary
  >
    <FrontSide style={{ fontSize: "30px",
    color:"black",
          position: "absolute",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: '#654a91'}} >
    Product <br />
    </FrontSide>
    <BackSide style={{ backgroundColor: '#'}}>
    Data indicating the Product type - LSE, RTL, or BLN.
    </BackSide>
    
  </Flippy>
  </Grid>

  <Grid item xs={2.3} >
    <Flippy
      flipOnHover={true} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '190px', height: '190px' }} /// these are optional style, it is not necessary
  >
    <FrontSide style={{ fontSize: "30px",
        color:"black",
          position: "absolute",
          width: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: '#7a7c00'}} >
    Alternate ID <br />
    </FrontSide>
    <BackSide style={{ backgroundColor: '#'}}>
    Data pertaining to alternate identifiers of the party. It also includes contact and contract information related to the party.

    </BackSide>
    
  </Flippy>
  </Grid>

  <Grid item xs={2.3}>
    <Flippy
      flipOnHover={true} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '190px', height: '190px' }} /// these are optional style, it is not necessary
  >
    <FrontSide style={{ fontSize: "30px",
        color:"black",
          position: "absolute",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: '#bc5c00'}} >
    Phone <br />
    </FrontSide>
    <BackSide style={{ backgroundColor: '#'}}>
    Data pertaining to the phone contacts of the party. 

    </BackSide>
    
  </Flippy>
  </Grid>

</Grid>


<Grid container spacing={2} padding={1} paddingLeft={11} paddingTop={2}>
<Grid item xs={3}>
  <Flippy
      flipOnHover={true} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '190px', height: '190px' }} /// these are optional style, it is not necessary
  >
    <FrontSide style={{ fontSize: "30px",
        color:"black",
          position: "absolute",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: '#008c00'}} >
      Other <br />
    </FrontSide>
    <BackSide style={{ fontSize:"0.9rem"}}>
    Any other miscellaneous data pertaining to the personal information of the party including Military Duty and Banking Information.



    </BackSide>
    
  </Flippy>
  </Grid>
  <Grid item xs={3} >
    <Flippy
      flipOnHover={true} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '190px', height: '190px' }} /// these are optional style, it is not necessary
  >
    <FrontSide style={{ fontSize: "30px",
            color:"darkgray",

          position: "absolute",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: '#0a2342'}} >

Borrower <br />
    </FrontSide>
    <BackSide style={{ backgroundColor: '#'}}>
    Data pertaining to the party relationship, and all the borrower-flag information related to the party's account with TFS.
    </BackSide>
    
  </Flippy>
  </Grid>

  <Grid item xs={3}>
    <Flippy
      flipOnHover={true} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '190px', height: '190px' }} /// these are optional style, it is not necessary
  >
    <FrontSide style={{ fontSize: "30px",
        color:"black",
          position: "absolute",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: '#ff88a7'}} >
      Address <br />
    </FrontSide>
    <BackSide style={{ backgroundColor: '#'}}>
    Data pertaining to the physical address associated with the party's account with TFS.

    </BackSide>
    
  </Flippy>
  </Grid>
  <Grid item xs={3}>
  <Flippy
      flipOnHover={true} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '190px', height: '190px' }} /// these are optional style, it is not necessary
  >
    <FrontSide style={{ fontSize: "30px",
        color:"black",

          position: "absolute",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: '#84bc9c'}} >
      Email <br />
    </FrontSide>
    <BackSide style={{ backgroundColor: '#'}}>
    Data pertaining to the email address, its validity, and most recent updates of the party.



    </BackSide>
    
  </Flippy>
  </Grid>
</Grid>
        </AccordionDetails>
      </Accordion>
  
    </>
  );
};
