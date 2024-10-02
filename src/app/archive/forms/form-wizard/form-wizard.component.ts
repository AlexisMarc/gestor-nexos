import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-form-wizard',
  templateUrl: './form-wizard.component.html',
  styleUrls: ['./form-wizard.component.scss']
})
export class FormWizardComponent implements OnInit {

	public disabledTabs ={
		shippingTab:true,
		paymentTab:true,
		FinalTab:true,
	}
	//Current Tab Index
	selectedStep = 0;
	
	pricingOptForm: FormGroup = new FormGroup({});
	shippingForm :FormGroup ;
	billingForm :FormGroup ;
 

  constructor(private fb: FormBuilder) { 
    this.shippingForm = this.fb.group({
      firstName :[ '', [ Validators.required ] ],
      email :[ '', [ Validators.required ] ],
      address :[ '', [ Validators.required ] ],
      state:[ '', [ Validators.required ] ]
	});
		
	this.billingForm = this.fb.group({
      cardHolderName :[ '', [ Validators.required ] ],
      cardNumber :[ '', [ Validators.required ] ]
	});
  }

	ngOnInit() {
		this.pricingOptForm = this.fb.group({
			pricingPick: 'C'
		});
	}
	
	navigateToShipping(){
		//validate here then
		this.disabledTabs.shippingTab = false;
		this.selectedStep = 1;
	}

	navigateToPayment(){
		//validate here then
		if(!this.shippingForm.invalid){
			this.disabledTabs.shippingTab = false;
			this.selectedStep = 2;
		}
		else{
			this.shippingForm
		}
	}

	navigateToFinal(){
		//validate here then
		if(!this.billingForm.invalid){
			this.disabledTabs.paymentTab = false;
			this.selectedStep = 3;
		}
		else{
			this.billingForm
		}
	}
	
	
	//Prev
	prevTab(){
		if(this.selectedStep > 0)
			this.selectedStep--;
	}
	//Next
	nextTab(){
			this.selectedStep++;
	}

	//Shipping Control GET
	getFormControl(name:any) {
    return this.shippingForm.controls[ name ];
	}
	//Billing Control GET
	getFormControlBilling(name:any) {
    return this.billingForm.controls[ name ];
	}
	

}
