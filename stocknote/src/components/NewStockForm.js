import {
    Button,
    Divider,
    Grid,
    HeaderContent,
    HeaderSubheader,
    Input,
  } from "semantic-ui-react";
  import { Col, Image } from "antd";
  import Notes from "./Notes";
import { useRef } from "react";
import { Link } from "react-router-dom";
const NewStockForm = (props) => {
    const {setLevel,show,showResistances,loading,showSupports,name,cmp,support,resistance,bodyWeekly,bodyDaily,weeklyPreview,dailyPreview,handleChange,handleClick,handleBody,handlePreview,handleLevels} = props;
    const fileInputRef = useRef(null);
    const file2InputRef = useRef(null);
    return (
        <Grid style={{ marginLeft: "20px" }}>
        <Grid.Row verticalAlign="middle" textAlign="left">
          <Col xs={24} xl={12} style={{ marginTop: "6px",display: show ? 'none': '' }}>
            <Input
              label="Stock"
              name="name"
              value={name}
              placeholder="Stock name"
              onChange={handleChange}
              type="text"
              hidden = {show}
            />
          </Col>
          <Col xs={24} xl={12} style={{ marginTop: "6px" }}>
            <Input
              label="CMP"
              name="cmp"
              value={cmp}
              placeholder="Enter CMP"
              onChange={handleChange}
              type="number"
              step="0.01"
            />
          </Col>
        </Grid.Row>
        <Divider />
        <Grid.Row textAlign="left">
          <Col xs={24} xl={12}>
            <HeaderContent as="h3">Support Levels</HeaderContent>
  
            <Input
              style={{ maxHeight: "54px" }}
              value={support}
              type="number"
              step="0.01"
              onChange={setLevel}
              placeholder="Enter Support Level"
              name="support"
              onKeyPress={handleLevels}
            />
            <ul style={{ padding: "0", maxHeight: "100px",width: '200px', overflowY: "scroll" }}>
              {showSupports()}
            </ul>
          </Col>
          <Col xs={24} xl={12}>
            <HeaderContent as="h3">Resistance Levels</HeaderContent>
            <Input
              style={{ maxHeight: "40px" }}
              value={resistance}
              type="number"
              step="0.01"
              onChange={setLevel}
              placeholder="Enter Resistance Level"
              name="resistance"
              onKeyPress={handleLevels}
            />
            <ul style={{ padding: "0", maxHeight: "100px",width:'200px', overflowY: "scroll" }}>
              {showResistances()}
            </ul>
          </Col>
        </Grid.Row>
        <Grid.Row textAlign="left">
          <Grid.Column width={10}>
            <HeaderSubheader as="h3">Weekly Analysis</HeaderSubheader>
            <Notes
              value={bodyWeekly}
              placeholder="Write your content here..."
              handleBody={handleBody}
              name="weekly"
              theme="snow"
              style={{ height: "235px" }}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <HeaderSubheader as="h3">Weekly shot</HeaderSubheader>
            <div>
              <Button
                inverted
                primary
                type="button"
                content="Image"
                icon="file"
                onClick={() => fileInputRef.current.click()}
                style={{ marginBottom: "4px" }}
              />
              <input
                hidden
                type="file"
                name="weeklyShot"
                accept="image/*"
                onChange={handlePreview}
                ref={fileInputRef}
              />
            </div>
            <Image src={weeklyPreview} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row textAlign="left">
          <Grid.Column width={10}>
            <HeaderSubheader as="h3">Daily Analysis</HeaderSubheader>
            <Notes
              value={bodyDaily}
              placeholder="Write your content here..."
              handleBody={handleBody}
              theme="snow"
              name="daily"
              style={{ height: "235px" }}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <HeaderSubheader as="h3">Daily shot</HeaderSubheader>
            <div>
              <Button
                inverted
                primary
                type="button"
                content="Image"
                icon="file"
                onClick={() => file2InputRef.current.click()}
                style={{ marginBottom: "4px" }}
              />
              <input
                hidden
                type="file"
                name="dailyShot"
                onChange={handlePreview}
                accept="image/*"
                ref={file2InputRef}
              />
            </div>
            <div style={{ width: "100%", height: "100%" }}>
              <Image
                src={
                  dailyPreview
                } /*onClick={() => setValue({...value,show:true})}*/
              />
            </div>
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row textAlign="justified">
          <Button color="green" loading={loading} disabled={loading} size="large" onClick={handleClick}>
            Save
          </Button>
          <Button as={Link} to="/my-stocks" color="orange" size="large">
            Cancel
          </Button>
        </Grid.Row>
        {/*<BackDrop closeModal={closeModal} ImageSource={dailyPreview} show={show}/>*/}
      </Grid>
    );
}
export default NewStockForm;