import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Grid
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const schema = yup.object().shape({
  title: yup.string().required("Job title is required"),
  location: yup.string().required("Location is required"),
  salary: yup.number().typeError("Salary must be a number").required("Salary is required"),
  jobTypes: yup.array().min(1, "Select at least one job type"),
  description: yup.string().required("Description is required"),
  benefits: yup.array().of(yup.string().required("Benefit cannot be empty")),
  requirements: yup.array().of(yup.string().required("Requirement cannot be empty")),
  responsibilities: yup.array().of(yup.string().required("Responsibility cannot be empty")),
});

const CreateJobForm = () => {
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { fields: benefits, append: appendBenefit, remove: removeBenefit } = useFieldArray({ 
    name: "benefits", 
    control 
  });
  const { fields: requirements, append: appendRequirement, remove: removeRequirement } = useFieldArray({ 
    name: "requirements", 
    control 
  });
  const { fields: responsibilities, append: appendResponsibility, remove: removeResponsibility } = useFieldArray({ 
    name: "responsibilities", 
    control 
  });

  const formValues = watch();
  const jobTypesValue = watch("jobTypes") || [];

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleFormSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/jobs", formValues);
      setMessage(response.data.message || "Job posted successfully!");
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    } finally {
      handleCloseDialog();
    }
  };

  const handleNewJob = () => {
    setSubmitSuccess(false);
    setMessage("");
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      {submitSuccess ? (
        <Box textAlign="center">
          <Typography variant="h5" gutterBottom color="success.main">
            Job Posted Successfully!
          </Typography>
          <Button variant="contained" onClick={handleNewJob} sx={{ mt: 2 }}>
            Post New Job
          </Button>
        </Box>
      ) : (
        <>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>Post a Job</Typography>
          <form onSubmit={handleSubmit(handleOpenDialog)}>
            <Grid container spacing={2}>
              {/* Title & Location Row */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Job Title"
                  fullWidth
                  {...register("title")}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Location"
                  fullWidth
                  {...register("location")}
                  error={!!errors.location}
                  helperText={errors.location?.message}
                />
              </Grid>

              {/* Salary & Job Type Row */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Salary"
                  fullWidth
                  {...register("salary")}
                  error={!!errors.salary}
                  helperText={errors.salary?.message}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel 
                    shrink={jobTypesValue.length > 0}
                    sx={{ backgroundColor: '#F4F4F4', px: 1 }}
                  >
                    Job Type
                  </InputLabel>
                  <Controller
                    name="jobTypes"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <Select
                        {...field}
                        multiple
                        value={field.value || []}
                        renderValue={(selected) => (
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                      >
                        {["Full-time", "Part-time", "Remote", "Seasonal"].map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* Description */}
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
              sx={{ mt: 3, mb: 2 }}
            />

            {/* Dynamic Sections */}
            {[
              { 
                name: "benefits", 
                label: "Benefit", 
                append: appendBenefit,
                remove: removeBenefit,
                fields: benefits 
              },
              { 
                name: "requirements", 
                label: "Requirement", 
                append: appendRequirement,
                remove: removeRequirement,
                fields: requirements 
              },
              { 
                name: "responsibilities", 
                label: "Responsibility", 
                append: appendResponsibility,
                remove: removeResponsibility,
                fields: responsibilities 
              }
            ].map((section) => (
              <Box key={section.name} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {section.label}s
                </Typography>
                {section.fields.map((field, index) => (
                  <Box key={field.id} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <TextField
                      fullWidth
                      {...register(`${section.name}.${index}`)}
                      error={!!errors[section.name]?.[index]}
                      helperText={errors[section.name]?.[index]?.message}
                      multiline
                      sx={{ flexGrow: 1 }}
                    />
                    <IconButton 
                      onClick={() => section.remove(index)}
                      color="error"
                      sx={{ alignSelf: 'flex-start' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button 
                  onClick={() => section.append("")} 
                  variant="outlined"
                  size="small"
                >
                  Add {section.label}
                </Button>
              </Box>
            ))}

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Submit Job
            </Button>
          </form>

          {/* Confirmation Dialog */}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Confirm Job Posting</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please review your job details before submitting:
              </DialogContentText>
              <Box sx={{ mt: 2 }}>
                <Typography><strong>Title:</strong> {formValues.title}</Typography>
                <Typography><strong>Location:</strong> {formValues.location}</Typography>
                <Typography><strong>Salary:</strong> {formValues.salary}</Typography>
                <Typography><strong>Type:</strong> {formValues.jobTypes?.join(", ")}</Typography>
                <Typography><strong>Description:</strong> {formValues.description?.substring(0, 100)}...</Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} variant="outlined">Cancel</Button>
              <Button onClick={handleFormSubmit} variant="contained" color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          {message && (
            <Typography color={message.includes("error") ? "error" : "success"} sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default CreateJobForm;