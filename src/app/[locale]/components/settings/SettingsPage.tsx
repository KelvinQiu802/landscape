import alarmList from '@/data/alarm.json';
import { Alarm, AppSettings } from '@/index';
import { VolumeDown, VolumeUp } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Snackbar,
  Stack,
} from '@mui/material';
import { useContext, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AppSettingsContext } from '../MainApp';
import Button from '../general/Button';
import InputWithLabel from '../general/InputWithLabel';
import SwitchWithLabel from '../general/SwitchWithLabel';
import style from './SettingsPage.module.css';

function SettingsPage() {
  const { appSettings, setAppSettings } = useContext(AppSettingsContext);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const { register, watch, handleSubmit, formState, control } =
    useForm<AppSettings>({
      defaultValues: appSettings,
    });

  const onSubmit: SubmitHandler<AppSettings> = (data) => {
    setAppSettings(data);
    setShowSnackbar(true);
  };

  return (
    <div className={style.box}>
      <div className={style.title}>Timer</div>
      <div className={style.tab}>
        <div className={style.flexRow}>
          <InputWithLabel
            label="Pomodoro"
            width={180}
            endAdornment={<div className={style.unit}>mins</div>}
            value={watch('timer.pomodoro')}
            type="number"
            {...register('timer.pomodoro', { required: true, min: 0 })}
          />
          <InputWithLabel
            label="Short Break"
            width={180}
            endAdornment={<div className={style.unit}>mins</div>}
            value={watch('timer.shortBreak')}
            type="number"
            {...register('timer.shortBreak', { required: true, min: 0 })}
          />
          <InputWithLabel
            label="Long Break"
            width={180}
            endAdornment={<div className={style.unit}>mins</div>}
            value={watch('timer.longBreak')}
            type="number"
            {...register('timer.longBreak', { required: true, min: 0 })}
          />
        </div>
        <div className={style.last}></div>
      </div>
      <div className={style.title}>Background Video</div>
      <div className={style.tab}>
        <SwitchWithLabel
          label="Auto Play"
          checked={watch('background.autoPlay')}
          {...register('background.autoPlay')}
        />
        <div className={`${style.desc} ${style.mb}`}>
          Auto play will mute the video by default.
        </div>
        <div className={style.subTitle}>Play Order</div>
        <Controller
          name="background.playOrder"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onChange={(e) => field.onChange(e.currentTarget.value)}
              row
            >
              <FormControlLabel value={0} label="Random" control={<Radio />} />
              <FormControlLabel value={1} label="Loop" control={<Radio />} />
              <FormControlLabel
                value={2}
                label="Sequential"
                control={<Radio />}
              />
            </RadioGroup>
          )}
        />
      </div>
      <div className={style.last}></div>
      <div className={style.title}>Countdown Alarm</div>
      <div className={style.tab}>
        <div className={style.subTitle}>Type</div>
        <Controller
          name="alarm.type"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onChange={(e) => field.onChange(e.currentTarget.value)}
              row
            >
              {(alarmList as Alarm[]).map((alarm) => (
                <FormControlLabel
                  key={alarm.fileName}
                  label={alarm.name}
                  value={alarm.fileName}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>
          )}
        />
        <div className={style.subTitle}>Volume</div>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <VolumeDown />
          <Controller
            name="alarm.volume"
            control={control}
            render={({ field }) => (
              <Slider
                min={0}
                max={1}
                step={0.1}
                sx={{ width: 150 }}
                value={field.value}
                onChange={(e, v) => field.onChange(v)}
              />
            )}
          />
          <VolumeUp />
        </Stack>
      </div>
      <div className={style.last}></div>
      <div className={`${style.flexRow} ${style.spaceBetween}`}>
        {formState.errors.timer ? (
          <div className={style.error}>All input fields must not be empty!</div>
        ) : (
          <div></div>
        )}
        <Button
          label="Save and Apply"
          icon={CheckIcon}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={1000}
        onClose={() => setShowSnackbar(false)}
        message="Saved and Applied!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
}

export default SettingsPage;
