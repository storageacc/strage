
function login(){
	$('#login_form').submit(function(){
		var err = {
			login_empty: "Enter Username", 
			pass_empty: "Enter Password",
			login_error: "Invalid Username / Password", 
			not_active: 'e-mail is not confirmed',
			banned: "Access to the account is suspended", 
			blocked: 'Account is blocked',
			error_form: 'Error form! Please reload the page',
			error_data: 'Data Error! Please reload the page'
		};
		//alert('Форма входа')
		$.ajax(
		{
			type: 'POST',
			url: 'login',
			data: $('#login_form').serialize()+'&form='+$('#login_form #login_btn').attr('name'),
			success: 
				function(data)
				{			
					data = $.parseJSON(data);
					$('#login_form  input').removeClass('error');
					if (data['error'] == 'OK')
					{
						location.replace("cabinet");
					}
					else 
					{
						var t = data['error'].split('_');
						if (t[0] == 'pass')
							$('#login_form #login_password').attr('placeholder', err[data['error']]).addClass('error');
						else if (t[0] == 'site' && t[1] == 'lock')
						{
							$('#login_form #login_username').val('').attr('placeholder', 'Log off').addClass('error');
							$('#login_form #login_password').val('').attr('placeholder', 'Engineering works').addClass('error');
						}					
						else
							$('#login_form #login_username').val('').attr('placeholder', err[data['error']]).addClass('error');
					}
				}
		});
		
		return false;
	})
}

function register(){
	$('#register_form').submit(function(){
		var err = {
			login_empty: 'Enter login',
			login_used: 'Username already in use',
			email_empty: 'Enter e-mail',
			email_wrong: 'Invalid e-mail',
			email_used: 'e-mail already in use',
			pass1_empty: 'Enter the password',
			pass1_short: "Password is too short",
			pass1_wrong: 'Password does not match format',
			pass2_empty: 'Confirm password',
			pass2_not_equal: 'Passwords do not match',
			pin_short: 'Short PIN',
			pin_empty: 'Enter the PIN code',
			sponsor_not_found: "Account not found",
			sponsor_is_self: 'You can not be yourself sponsor',
			must_agree_rules: 'You must accept the rules',
			error_form: 'Error form! Please reload the page',
			error_serificat: 'Certificate Error! Please reload the page'
		}
	
		$.ajax(
		{
			type: 'POST',
			url: 'registration',
			data: $('#register_form').serialize()+'&form='+$('#register_form #register').attr('name'),
			success: 
				function(data)
				{			
					data = $.parseJSON(data);
					if (data['error'] == 'OK')
					{
						$('#done #hader').html('Registration is completed');
						$('#done #text').html('You can now sign in to your account using the <b>Username and Password</b>.');
						$('#end_form').trigger('click');
					}
					else 
					{
						var t = data['error'].split('_');
						
						$('#register_form input').removeClass('error');
						
						if(t[0] == 'login')
							$('#register_form #reg_login').val('').attr('placeholder', err[data['error']]).addClass('error');
						else if(t[0] == 'email')
							$('#register_form #reg_mail').val('').attr('placeholder', err[data['error']]).addClass('error');
						else if(t[0] == 'pass1')
							$('#register_form #reg_pass1').val('').attr('placeholder', err[data['error']]).addClass('error');
						else if(t[0] == 'pass2')
							$('#register_form #reg_pass2').val('').attr('placeholder', err[data['error']]).addClass('error');					
						else if(t[0] == 'sponsor')
							$('#register_form #reg_sponsor').val('').attr('placeholder', err[data['error']]).addClass('error');
						else if(t[0] == 'pin')
							$('#register_form #reg_pin').val('').attr('placeholder', err[data['error']]).addClass('error');
						else if(t[0] == 'need')
							$('#activ').trigger('click');
						// else if(t[0] == 'must')
							// $('#pp_full_res #Agree').html(err[data['error']]).css({'color':'#f00'});
						else
							$('#register_form #reg_login').val('').attr('placeholder', err[data['error']]).addClass('error');
					}
				}
		});
		
		return false;
	})
}

function chkLogin()
{
	$('#reg_login').css({'color':'#000',  'border-color':'#000'});
	$.ajax(
		{
			type: 'POST',
			url: 'registration',
			data: 'chk=login&login='+encodeURIComponent($('#reg_login').val()),
			success: 
				function(ex)
				{
					if (ex == 1)
					{
						$('#reg_login').css({'color':'#f00',  'border-color':'#f00'});
					}
				}
		});
}

function chkMail()
{
	$('#reg_email').css({'color':'#000','border-color':'#000'});
	$.ajax(
		{
			type: 'POST',
			url: 'registration',
			data: 'chk=email&email='+encodeURIComponent($('#reg_email').val()),
			success: 
				function(ex)
				{
					if (ex == 1)
					{
						$('#reg_email').css({'color':'#f00',  'border-color':'#f00'});
					}
				}
		}
	);
}

function kchkLogin() {

	tid2=0;
	$('#reg_login').keypress(
		function()
		{
			clearTimeout(tid2);
			tid2=setTimeout(function(){ chkLogin(); }, 500);
		}
	);
	//chkLogin();
}
	
function kchkMail() {	
	tid=0;
	$('#reg_email').keypress(
		function()
		{
			clearTimeout(tid);
			tid=setTimeout(function(){ chkMail(); }, 500);
		}
	);
}


function resetpass() {
	$('#reset_form').submit(function(){
		var err = {
			login_empty: 'Enter login',
			mail_empty: 'Enter E-Mail',
			mail_wrong: 'Invalid E-Mail',
			login_or_email_error: 'Invalid Username / E-Mail',
			data_error: 'Error data',
			cod_error: 'Error sending code'
		};
		
		$.ajax(
		{
			type: 'POST',
			url: 'resetpass',
			data: $('#reset_form').serialize()+'&form='+$('#reset_form #reset_btn').attr('name'),
			success: 
				function(data)
				{			
					data = $.parseJSON(data);
					$('#reset_form  input').removeClass('error');
					if (data['error'] == 'OK')
					{
						$('#activ').trigger('click');
					}
					else 
					{
						var t = data['error'].split('_');
						if (t[0] == 'mail')
							$('#reset_form #res_email').val('').attr('placeholder', err[data['error']]).addClass('error');
						else
							$('#reset_form #res_username').val('').attr('placeholder', err[data['error']]).addClass('error');
					}
				}
		});
		
		return false;		
	});	
}

function confirmcode() {
	$('#confirm_form').submit(function(){
		var err = {
			code_empty: 'Enter the code',
			code_wrong: 'Incorrect code',
			code_not_actual: 'The code is not actual',
			code_expired: 'Expired activation code',
			oper_wrong: 'Invalid operation',
			oper_unkn: 'The operation is not implemented'
		};
			
		$.ajax(
		{
			type: 'POST',
			url: 'resetpass',
			data: $('#confirm_form').serialize()+'&form='+$('#confirm_form #confirm_btn').attr('name'),
			success: 
				function(data)
				{			
					data = $.parseJSON(data);
					$('#confirm_form  input').removeClass('error');
					if (data['error'] == 'OK')
					{
						$('#done #hader').html('Password is cleared');
						$('#done #text').html('Now you can sign in to your account using <b>temporary password</b>, which has been sent to your mailbox. Check Mail &nbsp.; After entering we recommend that you change the temporary password in your account.');
						$('#end_form').trigger('click');
					}
					else 
					{
						$('#confirm_form #code').val('').attr('placeholder', err[data['error']]).addClass('error');
					}
				}
		});
		
		return false;		
	});	
}

function chkChangePass() {
	$('#changepass_form').submit(function(){
		var err = {
			oldpass_empty: 'Enter your old password',
			oldpass_wrong: 'Wrong password',
			newpass_empty: 'Enter a new password',
			reppass_empty: 'Confirm password',
			pass_not_equal: 'Passwords do not match'
		};
		var gdata;
		
		$.ajax(
		{
			type: 'POST',
			url: 'changepass',
			data: 'chk=changepass&'+$('#changepass_form').serialize(),
			async: false,
			success: 
				function(data){
					gdata = $.parseJSON(data);
				}
		});
		
		$('#changepass_form input').css({'color':'#000',  'border-color':'#DCDCDC'});
					
		if (isNaN(gdata))
		{
			$.each(gdata, function(k, v){
				$('#changepass_form #'+k).val('').attr('placeholder', err[v]).css({'color':'#f00', 'border-color':'#f00'});
			});	
			return false;
		}
		else 
			return true;
	});	
}

function chkChangeMail() {
	$('#changemail_form').submit(function(){
		var err = {
			pass_empty: 'Enter the password',
			pass_wrong: 'Wrong password',
			email_empty: 'Enter new E-mail',
			email_used: 'E-mail already use',
			email_wrong: 'Invalid E-mail'
		};
		var gdata;
		
		$.ajax(
		{
			type: 'POST',
			url: 'changemail',
			data: 'chk=changemail&'+$('#changemail_form').serialize(),
			async: false,
			success: 
				function(data){
					gdata = $.parseJSON(data);
				}
		});
		
		$('#changemail_form input').css({'color':'#000',  'border-color':'#DCDCDC'});
					
		if (isNaN(gdata))
		{
			$.each(gdata, function(k, v){
				$('#changemail_form #'+k).val('').attr('placeholder', err[v]).css({'color':'#f00', 'border-color':'#f00'});
			});	
			return false;
		}
		else 
			return true;
	});	
}

$(document).ready(function(){
	login();
	register();
	resetpass();
	confirmcode();
});

