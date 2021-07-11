import './popup.css';

function Popup(props) {
    const {close, invoice} = props;
    return (
        <div className="popup-box">
          <div className="box">
              <h4 className="side-space">{invoice['Invoice ID']}</h4>
              <section className="side-space">
                  <label>ID</label>
                  <input type="text" value={invoice['Invoice ID']}/>
                  <label>Amount</label>
                  <input type="text" value={invoice['Invoice Amount']}/>
                  <label>Date</label>
                  <input type="text" value={invoice['Billing Period']}/>
                  <label>Credits Used</label>
                  <input type="text" value={invoice['Credits Used']}/>
                  {/* we can put value for dynamic change
                      I couldn't do that as csv is not converting the status correctly
                  */}
                  <input type="radio" value="Paid"/> Paid
                  <input type="radio" value="Not Paid"/> Not Paid
              </section>
              <section className="actions side-space">
                  <button className="cancel-btn" onClick={close}>Cancel</button>
                  <button className="update-btn" onClick={close}>Update Details</button>
              </section>
          </div>
        </div>
    );
}

export default Popup;