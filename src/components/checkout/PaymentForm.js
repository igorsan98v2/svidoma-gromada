import React,{useCallback} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Dropzone,{useDropzone}  from 'react-dropzone'


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
}));



export default function PaymentForm() {
  const classes = useStyles();
  const theme = useTheme();
  let that = new Object();
  that.maxSteps=0;
  that.images=[];
  const [activeStep, setActiveStep] = React.useState(0);
  let tutorialSteps = [];
  let maxSteps = tutorialSteps.length;
  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }
 
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Фотографії
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Dropzone onDrop={acceptedFiles => {
          const reader = new FileReader()

           reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
           // Do whatever you want with the file contents
              const binaryStr = reader.result
              that.images.push(binaryStr);
              that.maxSteps = that.images.length;
            console.log(binaryStr)
             }

              reader.readAsDataURL (acceptedFiles[0]);
            }}>
            {({getRootProps, getInputProps}) => (
              <section>
              <div className={classes.root} {...getRootProps()}>
              <input {...getInputProps()} />
               <p>Drag 'n' drop some files here, or click to select files</p>
               <img  className={classes.img} src={(()=>{return that.images[activeStep]? that.images[activeStep]:""})()}
                 alt="Oopps somethin goes wrong"/>
               <MobileStepper
                  steps={that.maxSteps}
                  position="static"
                  variant="text"
                  activeStep={activeStep}
                  nextButton={
                  <Button size="small" onClick={handleNext} disabled={activeStep => maxSteps - 1}>
                           Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                  </Button>
                  }
                  backButton={
                  <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                       {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                       Back
                   </Button> }
                   />
              </div>

              </section>)}
          </Dropzone>
        </Grid>
      
    
       
      </Grid>
    </React.Fragment>
  );
}
