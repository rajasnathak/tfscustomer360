import React from "react";
import { useRef } from 'react';
import Header from "components/Headers/Header";
import Grid from '@mui/material/Grid';
import Flippy, { FrontSide, BackSide } from 'react-flippy';// Lazy load ReactHoverFlip as it is a pure react component 


function Index() {
  const ref = useRef();
  return (
    
    <>
    
      <Header />
      {/* Page content */}
  <Grid container spacing={2} padding={2} >
  <Grid item xs={4} >
    <Flippy
      flipOnHover={true} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '250px', height: '250px' }} /// these are optional style, it is not necessary
  >
    <FrontSide style={{ fontSize: "45px",
        color:"black",
          position: "absolute",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: '#eb0a1e'}} >
    Party <br />
    </FrontSide>
    <BackSide style={{ 
          }}>
    Data pertaining to individuals or organizations directly involved or interested in TFS.
    </BackSide>
    
  </Flippy>
  </Grid>
  <Grid item xs={4}>
    <Flippy
      flipOnHover={true} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '250px', height: '250px' }} /// these are optional style, it is not necessary
  >
    <FrontSide style={{ fontSize: "45px",
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
  <Grid item xs={4}>
  <Flippy
      flipOnHover={true} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '250px', height: '250px' }} /// these are optional style, it is not necessary
  >
    <FrontSide style={{ fontSize: "45px",
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
</Grid>


<Grid container spacing={2} padding={2}>
  <Grid item xs={4} >
    <Flippy
      flipOnHover={true} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '250px', height: '250px' }} /// these are optional style, it is not necessary
  >
    <FrontSide style={{ fontSize: "45px",
        color:"black",
          position: "absolute",
          width: "100%",
          display: "flex",
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

  <Grid item xs={4}>
    <Flippy
      flipOnHover={true} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '250px', height: '250px' }} /// these are optional style, it is not necessary
  >
    <FrontSide style={{ fontSize: "45px",
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
  <Grid item xs={4}>
  <Flippy
      flipOnHover={true} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '250px', height: '250px' }} /// these are optional style, it is not necessary
  >
    <FrontSide style={{ fontSize: "45px",
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
    <BackSide style={{ backgroundColor: '#'}}>
    Any other miscellaneous data pertaining to the personal information of the party including Military Duty and Banking Information.



    </BackSide>
    
  </Flippy>
  </Grid>
</Grid>


<Grid container spacing={2} padding={2}>
  <Grid item xs={4} >
    <Flippy
      flipOnHover={true} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '250px', height: '250px' }} /// these are optional style, it is not necessary
  >
    <FrontSide style={{ fontSize: "45px",
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

  <Grid item xs={4}>
    <Flippy
      flipOnHover={true} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '250px', height: '250px' }} /// these are optional style, it is not necessary
  >
    <FrontSide style={{ fontSize: "45px",
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
  <Grid item xs={4}>
  <Flippy
      flipOnHover={true} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '250px', height: '250px' }} /// these are optional style, it is not necessary
  >
    <FrontSide style={{ fontSize: "45px",
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
    </>
  );
};

export default Index;
