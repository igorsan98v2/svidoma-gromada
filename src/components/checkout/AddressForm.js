import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));





export default function AddressForm() {

  const [values, setValues] = React.useState({
    eventsType: '',
    priority: '',
    multiline: 'Controlled',
    currency: 'EUR',
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  
  const classes = useStyles();
  let eventsType =[{label:'комунальні проблеми',value:'com'},
  {label:'загальні проблеми',value:'total'},
  {label:'громадьскі проблеми',value:'pab'},
  {label:'інші',value:'other'}];
  let priority =[
    {label:'низька',value:'low'},
    {label:'середня',value:'midle'},
    {label:'висока',value:'high'},
    {label:'надзвичайно важлива',value:'top'}];//значість
 
 
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Загальний опис
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <TextField
            required
            id="eventTitle"
            name="eventTitle"
            label="Заголовок"
            fullWidth
        
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
          id="standard-select-currency"
          select
          label="Обрати"
          className={classes.textField}
          value={values.eventsType}
          onChange={handleChange('eventsType')}
        
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
             helperText="Оберіть будь ласка тип проблеми"
             margin="normal"
             >
            {eventsType.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
               </MenuItem>
              ))}
            </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          id="standard-select-currency"
          select
          label="Обрати"
          className={classes.textField}
          value={values.priority}
          onChange={handleChange('priority')}
            SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
             helperText="Оберіть важливість проблеми"
             margin="normal"
             >
            {priority.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
               </MenuItem>
              ))}
            </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="standard-textarea"
            label="Опис"
            placeholder="Опишіть подію тут, будь ласка."
            fullWidth
            multiline
            required
            style ={{width:"100%"
          }}
            className={classes.textField}
             margin="normal"
            />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
