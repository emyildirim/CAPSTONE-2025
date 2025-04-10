import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

const HomeHeader = ({ 
    jobs, loading, jobTitleFilter, setJobTitleFilter, 
    locationFilter, setLocationFilter, 
    employmentTypeFilter, setEmploymentTypeFilter 
    }) => {

    const jobTypes = (jobs) => {
        const jobTypesAll = jobs.reduce((arr, job) => {
            return [...arr, ...job?.jobTypes]
        }, [])
        return [...new Set(jobTypesAll)]
    }
    return (
        <Stack spacing={2} sx={{
            marginTop: 4, 
            marginBottom: 2, 
            flexGrow: 1, 
            textAlign: 'center'
        }}>      
            <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <TextField
                    placeholder="Job title, keyword or company..." 
                    id="outlined-basic" 
                    variant="outlined" 
                    size="small"
                    sx={{ width: 400 }} 
                    value={jobTitleFilter}
                    onChange={(event) => {
                        setJobTitleFilter(event.target.value)
                    }}  
                />
                <TextField
                    placeholder="Location" 
                    id="outlined-basic"
                    variant="outlined" 
                    size="small"
                    sx={{ width: 250 }}
                    value={locationFilter}
                    onChange={(event) => {
                        setLocationFilter(event.target.value)
                    }} 
                />
            </Stack>
            <Stack 
                useFlexGap
                spacing={2} 
                direction="row" 
                sx={{ 
                    flexWrap: 'wrap', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                }}
            >
               Employment:
               {/* <Stack sx={{marginLeft: 2 }} direction="row" spacing={2}> */}
                {jobTypes(jobs).map((jobType) => {
                    return (
                        <Button
                            variant="contained"
                            key={jobType} 
                            color={employmentTypeFilter.includes(jobType) ? "primary" : "inherit"}
                            onClick={() => {
                                if(employmentTypeFilter.includes(jobType)){
                                    setEmploymentTypeFilter(employmentTypeFilter.filter((etFilter) => {
                                        return etFilter !== jobType
                                    }))
                                }
                                else{
                                    setEmploymentTypeFilter([...employmentTypeFilter, jobType])
                                }
                            }}
                        >
                            {jobType}
                        </Button>
                    )
                })}
                {employmentTypeFilter?.length > 0 && (
                    <Button
                        variant="contained" 
                        color="error"
                        onClick={() => {
                            setEmploymentTypeFilter("")
                        }}
                    >
                        Clear Selection
                    </Button>
                )}
               {/* </Stack> */}
            </Stack> 
            <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center' }}>
                {loading && (
                    <Button loading variant="outlined" loadingPosition="start">
                        loading:
                    </Button>
                )}
            </Stack> 
        </Stack>
    )
}
export default HomeHeader;