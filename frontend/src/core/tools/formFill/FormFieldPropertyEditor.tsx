/**
 * FormFieldPropertyEditor — Shared property editor for form field definitions.
 * Used by both FormFieldCreatePanel (create mode) and FormFieldModifyPanel (modify mode).
 */
import React from "react";
import {
  TextInput,
  NumberInput,
  Select,
  Switch,
  Text,
  ActionIcon,
  Button,
  Stack,
  SimpleGrid,
} from "@mantine/core";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import type {
  FormFieldType,
  NewFieldDefinition,
} from "@app/tools/formFill/types";

interface FormFieldPropertyEditorProps {
  field: NewFieldDefinition;
  onChange: (updated: NewFieldDefinition) => void;
  /** Whether to allow changing the field type (true in modify mode) */
  allowTypeChange?: boolean;
  /** Whether coordinates are read-only display */
  showCoordinates?: boolean;
  /** When provided, coordinate section renders editable NumberInputs */
  onCoordsChange?: (coords: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
}

const FIELD_TYPE_OPTION_KEYS: {
  value: FormFieldType;
  labelKey: string;
  fallback: string;
}[] = [
  {
    value: "text",
    labelKey: "formFill.fieldTypes.text",
    fallback: "Text Field",
  },
  {
    value: "checkbox",
    labelKey: "formFill.fieldTypes.checkbox",
    fallback: "Checkbox",
  },
  {
    value: "combobox",
    labelKey: "formFill.fieldTypes.dropdown",
    fallback: "Dropdown",
  },
  {
    value: "listbox",
    labelKey: "formFill.fieldTypes.listbox",
    fallback: "List Box",
  },
];

export function FormFieldPropertyEditor({
  field,
  onChange,
  allowTypeChange = false,
  showCoordinates = false,
  onCoordsChange,
}: FormFieldPropertyEditorProps) {
  const { t } = useTranslation();
  const hasOptions = field.type === "combobox" || field.type === "listbox";

  return (
    <Stack gap="xs">
      <TextInput
        label={t("formFill.propertyEditor.name", "Name")}
        size="xs"
        value={field.name}
        onChange={(e) => onChange({ ...field, name: e.currentTarget.value })}
        placeholder={t(
          "formFill.propertyEditor.fieldNamePlaceholder",
          "Field name",
        )}
      />

      <TextInput
        label={t("formFill.propertyEditor.label", "Label")}
        size="xs"
        value={field.label || ""}
        onChange={(e) =>
          onChange({ ...field, label: e.currentTarget.value || undefined })
        }
        placeholder={t(
          "formFill.propertyEditor.displayLabelPlaceholder",
          "Display label",
        )}
      />

      {allowTypeChange && (
        <Select
          label={t("formFill.propertyEditor.type", "Type")}
          size="xs"
          data={FIELD_TYPE_OPTION_KEYS.map((o) => ({
            value: o.value,
            label: t(o.labelKey, o.fallback),
          }))}
          value={field.type}
          onChange={(val) => {
            if (val) onChange({ ...field, type: val as FormFieldType });
          }}
        />
      )}

      <TextInput
        label={t("formFill.propertyEditor.tooltip", "Tooltip")}
        size="xs"
        value={field.tooltip || ""}
        onChange={(e) =>
          onChange({ ...field, tooltip: e.currentTarget.value || undefined })
        }
        placeholder={t(
          "formFill.propertyEditor.helpTextPlaceholder",
          "Help text",
        )}
      />

      <TextInput
        label={t("formFill.propertyEditor.defaultValue", "Default Value")}
        size="xs"
        value={field.defaultValue || ""}
        onChange={(e) =>
          onChange({
            ...field,
            defaultValue: e.currentTarget.value || undefined,
          })
        }
        placeholder={t(
          "formFill.propertyEditor.defaultValuePlaceholder",
          "Default value",
        )}
      />

      <NumberInput
        label={t("formFill.propertyEditor.fontSize", "Font Size (pt)")}
        size="xs"
        value={field.fontSize ?? ""}
        onChange={(val) =>
          onChange({
            ...field,
            fontSize: typeof val === "number" ? val : undefined,
          })
        }
        placeholder={t(
          "formFill.propertyEditor.fontSizePlaceholder",
          "12 (default)",
        )}
        min={4}
        max={72}
        step={1}
      />

      <Switch
        label={t("formFill.propertyEditor.required", "Required")}
        size="xs"
        checked={field.required || false}
        onChange={(e) =>
          onChange({ ...field, required: e.currentTarget.checked })
        }
        styles={{ label: { fontSize: "0.75rem", cursor: "pointer" } }}
      />

      <Switch
        label={t("formFill.propertyEditor.readOnly", "Read-only")}
        size="xs"
        checked={field.readOnly || false}
        onChange={(e) =>
          onChange({ ...field, readOnly: e.currentTarget.checked })
        }
        styles={{ label: { fontSize: "0.75rem", cursor: "pointer" } }}
      />

      {field.type === "text" && (
        <Switch
          label={t("formFill.propertyEditor.multiline", "Multiline")}
          size="xs"
          checked={field.multiline || false}
          onChange={(e) =>
            onChange({ ...field, multiline: e.currentTarget.checked })
          }
          styles={{ label: { fontSize: "0.75rem", cursor: "pointer" } }}
        />
      )}

      {hasOptions && (
        <div>
          <Text size="xs" fw={500} mb={4}>
            {t("formFill.propertyEditor.options", "Options")}
          </Text>
          {(field.options || []).map((opt, idx) => (
            <div key={idx} style={{ display: "flex", gap: 4, marginBottom: 4 }}>
              <TextInput
                size="xs"
                value={opt}
                onChange={(e) => {
                  const newOpts = [...(field.options || [])];
                  newOpts[idx] = e.currentTarget.value;
                  onChange({ ...field, options: newOpts });
                }}
                style={{ flex: 1 }}
                placeholder={t(
                  "formFill.propertyEditor.optionPlaceholder",
                  "Option {{num}}",
                  { num: idx + 1 },
                )}
              />
              <ActionIcon
                variant="subtle"
                color="red"
                size="sm"
                onClick={() => {
                  const newOpts = (field.options || []).filter(
                    (_, i) => i !== idx,
                  );
                  onChange({ ...field, options: newOpts });
                }}
              >
                <DeleteIcon sx={{ fontSize: 14 }} />
              </ActionIcon>
            </div>
          ))}
          <Button
            variant="subtle"
            size="xs"
            leftSection={<AddIcon sx={{ fontSize: 14 }} />}
            onClick={() => {
              onChange({ ...field, options: [...(field.options || []), ""] });
            }}
          >
            {t("formFill.propertyEditor.addOption", "Add Option")}
          </Button>
        </div>
      )}

      {field.type === "listbox" && (
        <Switch
          label={t("formFill.propertyEditor.multiSelect", "Multi-select")}
          size="xs"
          checked={field.multiSelect || false}
          onChange={(e) =>
            onChange({ ...field, multiSelect: e.currentTarget.checked })
          }
          styles={{ label: { fontSize: "0.75rem", cursor: "pointer" } }}
        />
      )}

      {showCoordinates && !onCoordsChange && (
        <div>
          <Text size="xs" fw={500} c="dimmed" mb={2}>
            {t("formFill.propertyEditor.position", "Position")}
          </Text>
          <Text size="xs" c="dimmed">
            Page {field.pageIndex + 1} &middot; ({Math.round(field.x)},{" "}
            {Math.round(field.y)}) &middot; {Math.round(field.width)} &times;{" "}
            {Math.round(field.height)} pt
          </Text>
        </div>
      )}

      {showCoordinates && onCoordsChange && (
        <div>
          <Text size="xs" fw={500} c="dimmed" mb={4}>
            {t(
              "formFill.propertyEditor.positionAndSize",
              "Position & Size (PDF points)",
            )}
          </Text>
          <SimpleGrid cols={2} spacing={4}>
            <NumberInput
              label={t("formFill.propertyEditor.x", "X")}
              size="xs"
              value={field.x}
              onChange={(val) => {
                if (typeof val === "number") {
                  onCoordsChange({
                    x: val,
                    y: field.y,
                    width: field.width,
                    height: field.height,
                  });
                }
              }}
              step={1}
              decimalScale={1}
            />
            <NumberInput
              label={t("formFill.propertyEditor.y", "Y")}
              size="xs"
              value={field.y}
              onChange={(val) => {
                if (typeof val === "number") {
                  onCoordsChange({
                    x: field.x,
                    y: val,
                    width: field.width,
                    height: field.height,
                  });
                }
              }}
              step={1}
              decimalScale={1}
            />
            <NumberInput
              label={t("formFill.propertyEditor.width", "Width")}
              size="xs"
              value={field.width}
              onChange={(val) => {
                if (typeof val === "number" && val > 0) {
                  onCoordsChange({
                    x: field.x,
                    y: field.y,
                    width: val,
                    height: field.height,
                  });
                }
              }}
              min={1}
              step={1}
              decimalScale={1}
            />
            <NumberInput
              label={t("formFill.propertyEditor.height", "Height")}
              size="xs"
              value={field.height}
              onChange={(val) => {
                if (typeof val === "number" && val > 0) {
                  onCoordsChange({
                    x: field.x,
                    y: field.y,
                    width: field.width,
                    height: val,
                  });
                }
              }}
              min={1}
              step={1}
              decimalScale={1}
            />
          </SimpleGrid>
        </div>
      )}
    </Stack>
  );
}
