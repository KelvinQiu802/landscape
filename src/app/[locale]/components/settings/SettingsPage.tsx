import alarmList from '@/data/alarm.json';
import { Alarm, AppSettings } from '@/index';
import { useRouter } from '@/utils/navigation';
import { VolumeDown, VolumeUp } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import HeadphonesIcon from '@mui/icons-material/Headphones';
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
// @ts-ignore
import useSound from 'use-sound';
import { AppSettingsContext } from '../MainApp';
import Button from '../general/Button';
import InputWithLabel from '../general/InputWithLabel';
import SwitchWithLabel from '../general/SwitchWithLabel';
import style from './SettingsPage.module.css';

export interface SettingsPageText {
  settingsPageText: {
    timer: string;
    pomodoro: string;
    shortBreak: string;
    longBreak: string;
    mins: string;
    backgroundVideo: string;
    autoPlay: string;
    autoPlayHint: string;
    playOrder: string;
    random: string;
    loop: string;
    sequential: string;
    countdownAlarm: string;
    type: string;
    play: string;
    volume: string;
    inputError: string;
    saveAndApply: string;
    saved: string;
  };
}

function SettingsPage({ settingsPageText }: SettingsPageText) {
  const locale = document.documentElement.lang;
  const { appSettings, setAppSettings } = useContext(AppSettingsContext);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [previewSound, setPreviewSound] = useState(appSettings.alarm.type);
  const [previewVolume, setPreviewVolume] = useState(appSettings.alarm.volume);
  const [playSoundPreview] = useSound(`/sounds/${previewSound}`, {
    volume: previewVolume,
  });
  const router = useRouter();
  const { register, watch, handleSubmit, formState, control } =
    useForm<AppSettings>({
      defaultValues: appSettings,
    });

  const onSubmit: SubmitHandler<AppSettings> = (data) => {
    setAppSettings(data);
    localStorage.setItem('appSettings', JSON.stringify(data));
    setShowSnackbar(true);
  };

  return (
    <div className={style.box}>
      <div className={style.title}>{settingsPageText.timer}</div>
      <div className={style.tab}>
        <div className={style.flexRow}>
          <InputWithLabel
            label={settingsPageText.pomodoro}
            width={180}
            endAdornment={
              <div className={style.unit}>{settingsPageText.mins}</div>
            }
            value={watch('timer.pomodoro')}
            type="number"
            {...register('timer.pomodoro', { required: true, min: 0 })}
          />
          <InputWithLabel
            label={settingsPageText.shortBreak}
            width={180}
            endAdornment={
              <div className={style.unit}>{settingsPageText.mins}</div>
            }
            value={watch('timer.shortBreak')}
            type="number"
            {...register('timer.shortBreak', { required: true, min: 0 })}
          />
          <InputWithLabel
            label={settingsPageText.longBreak}
            width={180}
            endAdornment={
              <div className={style.unit}>{settingsPageText.mins}</div>
            }
            value={watch('timer.longBreak')}
            type="number"
            {...register('timer.longBreak', { required: true, min: 0 })}
          />
        </div>
        <div className={style.last}></div>
      </div>
      <div className={style.title}>{settingsPageText.backgroundVideo}</div>
      <div className={style.tab}>
        <SwitchWithLabel
          label={settingsPageText.autoPlay}
          checked={watch('background.autoPlay')}
          {...register('background.autoPlay')}
        />
        <div className={`${style.desc} ${style.mb}`}>
          {settingsPageText.autoPlayHint}
        </div>
        <div className={style.subTitle}>{settingsPageText.playOrder}</div>
        <Controller
          name="background.playOrder"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onChange={(e) => field.onChange(e.currentTarget.value)}
              row
            >
              <FormControlLabel
                value={0}
                label={settingsPageText.random}
                control={<Radio />}
              />
              <FormControlLabel
                value={1}
                label={settingsPageText.loop}
                control={<Radio />}
              />
              <FormControlLabel
                value={2}
                label={settingsPageText.sequential}
                control={<Radio />}
              />
            </RadioGroup>
          )}
        />
      </div>
      <div className={style.last}></div>
      <div className={style.title}>{settingsPageText.countdownAlarm}</div>
      <div className={style.tab}>
        <div className={style.subTitle}>{settingsPageText.type}</div>
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
                  onClick={() => {
                    setPreviewSound(alarm.fileName);
                  }}
                />
              ))}
              <Button
                label={settingsPageText.play}
                hideBg
                icon={HeadphonesIcon}
                onClick={playSoundPreview}
              />
            </RadioGroup>
          )}
        />
        <div className={style.subTitle}>{settingsPageText.volume}</div>
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
                onChange={(e, v) => {
                  field.onChange(v);
                  setPreviewVolume(v as number);
                }}
                onChangeCommitted={playSoundPreview}
              />
            )}
          />
          <VolumeUp />
        </Stack>
      </div>
      <div className={style.last}></div>
      {/* Language isn't included in the settings, not necessary */}
      <div className={style.title}>Language</div>
      <div className={style.tab}>
        <RadioGroup
          value={locale}
          onChange={(e, v) => {
            router.push('/', { locale: v });
          }}
          row
        >
          <FormControlLabel label="English" control={<Radio />} value={'en'} />
          <FormControlLabel label="中文" control={<Radio />} value={'zh'} />
        </RadioGroup>
      </div>
      <div className={`${style.flexRow} ${style.spaceBetween}`}>
        {formState.errors.timer ? (
          <div className={style.error}>{settingsPageText.inputError}</div>
        ) : (
          <div></div>
        )}
        <Button
          label={settingsPageText.saveAndApply}
          icon={CheckIcon}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={1000}
        onClose={() => setShowSnackbar(false)}
        message={settingsPageText.saved}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
}

export default SettingsPage;
