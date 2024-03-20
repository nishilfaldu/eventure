"use client";
import type { CheckboxProps } from "antd";
import { Checkbox } from "antd";
import { Input } from "antd";




const indEvent: React.FC = () => {
  const onChange: CheckboxProps["onChange"] = e => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <>
      <h2>Select all you need for your perfect event!</h2>
      <div className="Guests">
        <h3>Guests</h3>
        <Checkbox onChange={onChange}>Create a guest list</Checkbox> <br/>
        <Checkbox onChange={onChange}>Make invitations</Checkbox> <br/>
        <Checkbox onChange={onChange}>Send invitations</Checkbox> <br/>
        <Checkbox onChange={onChange}>Track RSVP</Checkbox> <br/>
        <Checkbox onChange={onChange}>
          <Input placeholder="Add your own" />
        </Checkbox> <br/>
      </div>
      <div className="Decorations">
        <h3>Decorations</h3>
        <Checkbox onChange={onChange}>Balloons</Checkbox> <br/>
        <Checkbox onChange={onChange}>Flowers</Checkbox> <br/>
        <Checkbox onChange={onChange}>Banners and Posters</Checkbox> <br/>
        <Checkbox onChange={onChange}>Table Decorations</Checkbox> <br/>
        <Checkbox onChange={onChange}>Wall Decorations</Checkbox> <br/>
        <Checkbox onChange={onChange}>Lighting</Checkbox> <br/>
        <Checkbox onChange={onChange}>Personalized Touches</Checkbox> <br/>
        <Checkbox onChange={onChange}>
          <Input placeholder="Add your own" />
        </Checkbox> <br/>
      </div>
      <div className="Entertainment">
        <h3>Entertainment</h3>
        <Checkbox onChange={onChange}>Music</Checkbox> <br/>
        <Checkbox onChange={onChange}>Professional Entertainers</Checkbox> <br/>
        <Checkbox onChange={onChange}>Games and Activities</Checkbox> <br/>
        <Checkbox onChange={onChange}>Photo Booth</Checkbox> <br/>
        <Checkbox onChange={onChange}>Prizes and Awards</Checkbox> <br/>
        <Checkbox onChange={onChange}>
          <Input placeholder="Add your own" />
        </Checkbox> <br/>
      </div>
      <div className="FoodAndBeverages">
        <h3>Food and Beverages</h3>
        <Checkbox onChange={onChange}>Snacks and Appetizers</Checkbox> <br/>
        <Checkbox onChange={onChange}>Main Course</Checkbox> <br/>
        <Checkbox onChange={onChange}>Beverages</Checkbox> <br/>
        <Checkbox onChange={onChange}>Desserts</Checkbox> <br/>
        <Checkbox onChange={onChange}>Cater Everything</Checkbox> <br/>
        <Checkbox onChange={onChange}>
          <Input placeholder="Add your own" />
        </Checkbox> <br/>
      </div>
      <div className="PartySupplies">
        <h3>Party Supplies</h3>
        <Checkbox onChange={onChange}>Plates and Utensils</Checkbox> <br/>
        <Checkbox onChange={onChange}>Cups and Straws</Checkbox> <br/>
        <Checkbox onChange={onChange}>Table Cloths/Table Runners</Checkbox> <br/>
        <Checkbox onChange={onChange}>Party Hats/Accessories</Checkbox> <br/>
        <Checkbox onChange={onChange}>Candles</Checkbox> <br/>
        <Checkbox onChange={onChange}>Cake Toppers</Checkbox> <br/>
        <Checkbox onChange={onChange}>
          <Input placeholder="Add your own" />
        </Checkbox> <br/>
      </div>
      <div className="PartyFavors">
        <h3>Party Favors</h3>
        <Checkbox onChange={onChange}>Return Gifts</Checkbox> <br/>
        <Checkbox onChange={onChange}>Thank You Notes</Checkbox> <br/>
        <Checkbox onChange={onChange}>
          <Input placeholder="Add your own" />
        </Checkbox> <br/>
      </div>
      <div className="CleanUp">
        <h3>Clean Up</h3>
        <Checkbox onChange={onChange}>Trash Bags</Checkbox> <br/>
        <Checkbox onChange={onChange}>Cleaning Supplies</Checkbox> <br/>
        <Checkbox onChange={onChange}>Recycling</Checkbox> <br/>
        <Checkbox onChange={onChange}>Food Containers</Checkbox> <br/>
        <Checkbox onChange={onChange}>Vacuum</Checkbox> <br/>
        <Checkbox onChange={onChange}>
          <Input placeholder="Add your own" />
        </Checkbox> <br/>
      </div>


    </>
  );
};

export default indEvent;

