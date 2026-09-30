import { config, fields, singleton } from '@keystatic/core';
export default config({
 storage: import.meta.env.DEV && import.meta.env.KEYSTATIC_GITHUB_MODE !== 'true'
  ? { kind: 'local' }
  : { kind: 'github', repo: 'mxjxn/mxjxn.net' },
 singletons: {
  directory: singleton({
   label: 'Profile & links',
   path: 'src/content/directory',
   format: { data: 'json' },
   schema: {
    name: fields.text({ label: 'Name', validation: { isRequired: true } }),
    description: fields.text({ label: 'Short description' }),
    location: fields.text({ label: 'Location' }),
    links: fields.array(fields.object({
     label: fields.text({ label: 'Link title', validation: { isRequired: true } }),
     url: fields.text({ label: 'Destination', description: 'A full https:// URL, mailto: email link, or tel: phone link.', validation: { isRequired: true, pattern: { regex: /^(https?:\/\/[^\s]+|mailto:[^\s]+|tel:[^\s]+)$/i, message: 'Use a complete https://, http://, mailto:, or tel: URL.' } } }),
     description: fields.text({ label: 'Subtitle (optional)', description: 'Leave blank to show the destination.' }),
     enabled: fields.checkbox({ label: 'Show this link', defaultValue: true }),
     newTab: fields.checkbox({ label: 'Open in a new tab', defaultValue: false }),
    }), { label: 'Links — drag to reorder', itemLabel: props => props.fields.label.value || 'New link' }),
   },
  }),
 },
});
